const { GraphQLNonNull, GraphQLID, GraphQLString } = require("graphql");
const { TicketType, CreateTicketInputType, AddMessageInputType, DepartmentInfoType } = require("../types/ticket.types");
const { validateToken } = require("../../../utils/authBackend");
const TicketModel = require("../../../../models/Ticket");
const UserModel = require("../../../../models/User");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// مسیر ذخیره‌سازی فایل‌های پیوست (تنظیم بر اساس ساختار پروژه)
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "tickets");

// اطمینان از وجود مسیر ذخیره‌سازی فایل‌ها
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}



// ایجاد تیکت جدید
const createTicket = {
    type: TicketType,
    args: {
        input: { type: new GraphQLNonNull(CreateTicketInputType) },
        file: { type: GraphQLString } // برای ارسال فایل استفاده می‌شود (باید در سمت فرانت‌اند هندل شود)
    },
    resolve: async (_, { input, file }, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error("کاربر احراز هویت نشده است");
            }

            const { title, department, subDepartment, priority, initialRequest } = input;

            // چک کردن اعتبار دپارتمان
            const departmentsMap = TicketModel.getDepartmentsMap();
            if (!Object.keys(departmentsMap).includes(department)) {
                throw new Error("دپارتمان نامعتبر است");
            }

            // چک کردن اعتبار ساب دپارتمان
            if (subDepartment && !departmentsMap[department].includes(subDepartment)) {
                throw new Error("ساب دپارتمان نامعتبر است");
            }

            // دریافت اطلاعات کاربر
            const userData = await UserModel.findById(user._id);

            // ایجاد تیکت جدید
            const newTicket = new TicketModel({
                user: user._id,
                title,
                department,
                subDepartment: subDepartment || "",
                priority,
                initialRequest,
                username: userData.username || "کاربر",
                createdAt: new Date(),
                updatedAt: new Date(),
                messages: []
            });

            // اگر فایلی آپلود شده باشد
            if (req.files && req.files.file) {
                const uploadedFile = req.files.file;
                const fileName = `${uuidv4()}-${uploadedFile.name}`;
                const filePath = path.join(UPLOAD_DIR, fileName);

                // ذخیره فایل
                await uploadedFile.mv(filePath);

                // اضافه کردن اطلاعات فایل به تیکت
                newTicket.attachments.push({
                    fileUrl: `/uploads/tickets/${fileName}`,
                    fileName: uploadedFile.name,
                    fileType: uploadedFile.mimetype,
                    uploadedAt: new Date()
                });
            }

            const savedTicket = await newTicket.save();

            // اضافه کردن تیکت به کاربر
            if (!userData.tickets) {
                userData.tickets = [];
            }
            userData.tickets.push(savedTicket._id);
            await userData.save();

            return savedTicket;
        } catch (error) {
            throw new Error(`خطا در ایجاد تیکت: ${error.message}`);
        }
    }
};





// افزودن پیام جدید به تیکت
const addMessageToTicket = {
    type: TicketType,
    args: {
        input: { type: new GraphQLNonNull(AddMessageInputType) },
        file: { type: GraphQLString } // برای ارسال فایل
    },
    resolve: async (_, { input, file }, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error("کاربر احراز هویت نشده است");
            }

            const { ticketId, text } = input;

            // یافتن تیکت و بررسی مالکیت
            const ticket = await TicketModel.findOne({
                _id: ticketId,
                user: user._id
            });

            if (!ticket) {
                throw new Error("تیکت مورد نظر یافت نشد یا شما دسترسی به آن ندارید");
            }

            // بررسی وضعیت تیکت
            if (ticket.status === "closed") {
                throw new Error("این تیکت بسته شده است و امکان ارسال پیام وجود ندارد");
            }

            // افزودن پیام جدید
            const newMessage = {
                sender: "user",
                text,
                createdAt: new Date()
            };

            ticket.messages.push(newMessage);
            ticket.updatedAt = new Date();

            // تغییر وضعیت تیکت اگر responded بود
            if (ticket.status === "responded") {
                ticket.status = "pending";
            }

            // اگر فایلی آپلود شده باشد
            if (req.files && req.files.file) {
                const uploadedFile = req.files.file;
                const fileName = `${uuidv4()}-${uploadedFile.name}`;
                const filePath = path.join(UPLOAD_DIR, fileName);

                // ذخیره فایل
                await uploadedFile.mv(filePath);

                // اضافه کردن اطلاعات فایل به تیکت
                ticket.attachments.push({
                    fileUrl: `/uploads/tickets/${fileName}`,
                    fileName: uploadedFile.name,
                    fileType: uploadedFile.mimetype,
                    uploadedAt: new Date()
                });
            }

            await ticket.save();

            return ticket;
        } catch (error) {
            throw new Error(`خطا در ارسال پیام: ${error.message}`);
        }
    }
};

// بستن تیکت توسط کاربر
const closeTicket = {
    type: TicketType,
    args: {
        ticketId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, { ticketId }, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error("کاربر احراز هویت نشده است");
            }

            // یافتن تیکت و بررسی مالکیت
            const ticket = await TicketModel.findOne({
                _id: ticketId,
                user: user._id
            });

            if (!ticket) {
                throw new Error("تیکت مورد نظر یافت نشد یا شما دسترسی به آن ندارید");
            }

            // تغییر وضعیت تیکت به closed
            ticket.status = "closed";
            ticket.updatedAt = new Date();

            // افزودن پیام سیستمی
            ticket.messages.push({
                sender: "user",
                text: "تیکت توسط کاربر بسته شد.",
                createdAt: new Date()
            });

            await ticket.save();

            return ticket;
        } catch (error) {
            throw new Error(`خطا در بستن تیکت: ${error.message}`);
        }
    }
};

module.exports = {
    createTicket,
    addMessageToTicket,
    closeTicket,
};