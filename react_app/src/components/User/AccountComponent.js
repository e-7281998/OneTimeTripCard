import React from "react";

function AccountComponent({ userInfo, handleChange }) {
  return (
    <>
      계좌 등록 국가
      <input
        type="text"
        className="form-control"
        placeholder="UserAccountNo"
        aria-label="UserAccountNo"
        name="accountNo"
        defaultValue="-----"
        onChange={handleChange}
      ></input>
      소유주
      <div className="d-flex">
        <input
          type="text"
          className="form-control"
          placeholder="UserAccountNo"
          aria-label="UserAccountNo"
          name="accountNo"
          defaultValue={userInfo.firstName}
          readOnly
        ></input>
        <input
          type="text"
          className="form-control"
          placeholder="UserAccountNo"
          aria-label="UserAccountNo"
          name="accountNo"
          defaultValue={userInfo.lastName}
          readOnly
        ></input>
      </div>
      은행명
      <input
        type="text"
        className="form-control"
        placeholder="UserAccountNo"
        aria-label="UserAccountNo"
        name="accountNo"
        defaultValue={userInfo.bankName}
        onChange={handleChange}
      ></input>
      계좌번호
      <input
        type="text"
        className="form-control"
        placeholder="UserAccountNo"
        aria-label="UserAccountNo"
        name="accountNo"
        defaultValue={userInfo.accountNo}
        onChange={handleChange}
      ></input>
    </>
  );
}

export default AccountComponent;
