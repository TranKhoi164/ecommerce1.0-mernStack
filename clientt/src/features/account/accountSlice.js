import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  account: {}
}

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    updateAccount: (state, action) => {
      for (const property in action.payload) {
        state.account[property] = action.payload[property]
      }
    },
    logoutAccount: (state, action) => {
      state.account = {}
    }
  }
});

export const {updateAccount, logoutAccount} = accountSlice.actions
export const selectAccount = state => state.accountData.account
export default accountSlice.reducer