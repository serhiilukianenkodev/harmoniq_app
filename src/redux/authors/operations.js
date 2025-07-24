import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

// GET @ /contacts
// export const fetchContacts = createAsyncThunk(
//   "contacts/fetchAll",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("/contacts");
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// POST @ /contacts
// export const addContact = createAsyncThunk(
//   "contacts/addContact",
//   async (contact, thunkAPI) => {
//     try {
//       const response = await axios.post("/contacts", contact);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

// DELETE @ /contacts/:id
// export const deleteContact = createAsyncThunk(
//   "contacts/deleteContact",
//   async (contactId, thunkAPI) => {
//     try {
//       const response = await axios.delete(`/contacts/${contactId}`);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );
