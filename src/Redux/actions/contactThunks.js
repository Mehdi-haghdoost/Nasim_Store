import { createAsyncThunk } from "@reduxjs/toolkit";
import { SUBMIT_CONTACT } from "@/graphql/entities/contact/contact.mutations";
import client from "@/graphql/client";

export const submitContactMessage = createAsyncThunk(
  'contact/submitContactMessage',
  async ({ name, email, message, saveInfo }, { rejectWithValue }) => {
    try {
      const { data, errors } = await client.mutate({
        mutation: SUBMIT_CONTACT,
        variables: {
          name,
          email,
          message,
          saveInfo: saveInfo ? "true" : "false" // تبدیل boolean به string
        }
      });

      if (errors && Array.isArray(errors) && errors.length > 0) {
        console.error("GraphQL errors:", errors);
        return rejectWithValue(errors[0].message || 'مشکلی در ارسال پیام رخ داد.');
      }

      if (data?.submitContact) {
        // بررسی موفقیت از سمت سرور
        if (!data.submitContact.success) {
          return rejectWithValue(data.submitContact.message || 'خطا در ارسال پیام');
        }
        return data.submitContact;
      }

      console.error('No data returned from submitContact mutation');
      return rejectWithValue('مشکلی در ارسال پیام رخ داد.');
    } catch (error) {
      console.error("Error sending contact message:", error);
      console.error("Error stack:", error.stack);
      return rejectWithValue('مشکلی در ارتباط با سرور رخ داد. لطفاً دوباره تلاش کنید.');
    }
  }
);