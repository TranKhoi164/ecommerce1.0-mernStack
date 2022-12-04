import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  account: {}
}

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    updateAccount: (state, action) => {
      state.account = action.payload
    },
    deleteAccount: (state, action) => {
      state.account = {}
    }
  }
});

export const {updateAccount, deleteAccount} = accountSlice.actions
export const selectAccount = state => state.accountData.account
export default accountSlice.reducer