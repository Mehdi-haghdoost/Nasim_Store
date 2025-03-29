const { GraphQLList, GraphQLNonNull, GraphQLID } = require("graphql");
const { validateToken } = require("../../utils/authBackend");
const { TicketType, DepartmentInfoType } = require("../types/ticket.types");
const TicketModel = require('../../../models/Ticket')
// دریافت لیست تیکت‌های کاربر
const getUserTickets = {
    type: new GraphQLList(TicketType),
    resolve: async (_, __, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error("کاربر احراز هویت نشده است");
            }

            const tickets = await TicketModel.find({ user: user._id })
                .sort({ updatedAt: -1 });

            return tickets;
        } catch (error) {
            throw new Error(`خطا در دریافت تیکت‌ها: ${error.message}`);
        }
    }
};

// دریافت جزئیات یک تیکت
const getTicketById = {
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

            // جستجوی تیکت با شرط مالکیت کاربر (امنیت)
            const ticket = await TicketModel.findOne({
                _id: ticketId,
                user: user._id
            });

            if (!ticket) {
                throw new Error("تیکت مورد نظر یافت نشد یا شما دسترسی به آن ندارید");
            }

            return ticket;
        } catch (error) {
            throw new Error(`خطا در دریافت جزئیات تیکت: ${error.message}`);
        }
    }
};

// دریافت لیست دپارتمان‌ها و ساب دپارتمان‌ها
const getDepartments = {
    type: new GraphQLList(DepartmentInfoType),
    resolve: async () => {
        const departmentsMap = TicketModel.getDepartmentsMap();

        const result = [];
        for (const [departmentId, subDepartments] of Object.entries(departmentsMap)) {
            let departmentName;
            switch (departmentId) {
                case "technical":
                    departmentName = "فنی";
                    break;
                case "financial":
                    departmentName = "مالی";
                    break;
                case "sales":
                    departmentName = "فروش";
                    break;
                case "general":
                    departmentName = "عمومی";
                    break;
                default:
                    departmentName = departmentId;
            }

            result.push({
                departmentId,
                departmentName,
                subDepartments
            });
        }

        return result;
    }
};

module.exports = {
    getUserTickets,
    getTicketById,
    getDepartments,
};