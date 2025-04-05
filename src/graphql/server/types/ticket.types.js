const { GraphQLEnumType, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInputObjectType, GraphQLNonNull } = require("graphql");

const TicketStatusEnum = new GraphQLEnumType({
    name: "TicketStatusEnum",
    values: {
        PENDING: { value: "pending" },
        RESPONDED: { value: "responded" },
        CLOSED: { value: "closed" },
    }
});

// تعریف Enum برای دپارتمان
const DepartmentEnum = new GraphQLEnumType({
    name: "DepartmentEnum",
    values: {
        TECHNICAL: { value: "technical" },
        FINANCIAL: { value: "financial" },
        SALES: { value: "sales" },
        GENERAL: { value: "general" },
    }
});

// تعریف Enum برای اولویت
const PriorityEnum = new GraphQLEnumType({
    name: "PriorityEnum",
    values: {
        LOW: { value: "low" },
        MEDIUM: { value: "medium" },
        HIGH: { value: "high" },
    }
});

// تعریف Enum برای فرستنده پیام
const MessageSenderEnum = new GraphQLEnumType({
    name: "MessageSenderEnum",
    values: {
        USER: { value: "user" },
        SUPPORT: { value: "support" },
    }
});

const TicketMessageType = new GraphQLObjectType({
    name: "TicketMessageType",
    fields: {
        _id: { type: GraphQLID },
        sender: { type: MessageSenderEnum },
        text: { type: GraphQLString },
        createdAt: { type: GraphQLString },
    }
});

// تایپ برای پیوست‌ها
const TicketAttachmentType = new GraphQLObjectType({
    name: "TicketAttachmentType",
    fields: {
        _id: { type: GraphQLID },
        fileUrl: { type: GraphQLString },
        fileName: { type: GraphQLString },
        fileType: { type: GraphQLString },
        uploadedAt: { type: GraphQLString },
    }
});

const TicketType = new GraphQLObjectType({
    name: "TicketType",
    fields: () => {
        const { UserType } = require("./user.types");

        return {

            _id: { type: GraphQLID },
            user: {
                type: UserType,
                resolve: async (ticket) => {
                    return await ticket.populate('user').execPopulate().then(t => t.user);
                }
            },
            title: { type: GraphQLString },
            department: { type: DepartmentEnum },
            subDepartment: { type: GraphQLString },
            priority: { type: PriorityEnum },
            status: { type: TicketStatusEnum },
            createdAt: { type: GraphQLString },
            updatedAt: { type: GraphQLString },
            initialRequest: { type: GraphQLString },
            username: { type: GraphQLString },
            messages: { type: new GraphQLList(TicketMessageType) },
            attachments: { type: new GraphQLList(TicketAttachmentType) },
        }
    }
});

// تایپ ورودی برای ایجاد تیکت جدید
const CreateTicketInputType = new GraphQLInputObjectType({
    name: "CreateTicketInput",
    fields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        department: { type: new GraphQLNonNull(GraphQLString) },
        subDepartment: { type: GraphQLString },
        priority: { type: new GraphQLNonNull(GraphQLString) },
        initialRequest: { type: new GraphQLNonNull(GraphQLString) }
    }
});

// تایپ ورودی برای اضافه کردن پیام
const AddMessageInputType = new GraphQLInputObjectType({
    name: "AddMessageInput",
    fields: {
        ticketId: { type: new GraphQLNonNull(GraphQLID) },
        text: { type: new GraphQLNonNull(GraphQLString) }
    }
});

// تایپ خروجی برای دپارتمان‌ها و ساب دپارتمان‌ها
const DepartmentInfoType = new GraphQLObjectType({
    name: "DepartmentInfoType",
    fields: {
        departmentId: { type: GraphQLString },
        departmentName: { type: GraphQLString },
        subDepartments: { type: new GraphQLList(GraphQLString) }
    }
});

module.exports = {
    TicketType,
    TicketStatusEnum,
    DepartmentEnum,
    PriorityEnum,
    MessageSenderEnum,
    TicketMessageType,
    TicketAttachmentType,
    CreateTicketInputType,
    AddMessageInputType,
    DepartmentInfoType
};