import styled from "styled-components";

export const EmailVerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  background-color: white;
  padding: 30px;
  outline: none;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  justify-content: space-between;
`;

export const EmailVerContainer1 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  background-color: white;
  padding: 30px;
  outline: none;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  justify-content: space-between;
`;

export const ModalHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalText = styled.div`
  display: flex;
  justify-content: flex-start;
  grid-gap: 8px;
  align-items: center;
  font-size: 24px;
  p:nth-child(1) {
    color: #000000;
  }
  p:nth-child(2) {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const BulletList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

export const BulletListItem = styled.li`
  margin-bottom: 8px;
  color: ${({ color }) => (color ? color : "#000")};
`;

export const Resend = styled.a`
  color: #000;
`;

export const AdditionalNotesContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
  background-color: white;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
`;

export const AdditionalNotesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-radius: 10px 10px 0px 0px;
`;

export const AdditionalNotesBody = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  padding: 20px 30px;
  overflow-y: auto;
`;

export const AdditionalButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  grid-gap: 10px;
`;

export const ValidateTaxContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  background-color: white;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 25px;
  border-radius: 20px;
  align-items: center;
  padding: 30px;
`;

export const ValidateTaxBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
`;

export const RentalFormPreviewBody = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  padding: 10px 15px;
`;

export const RentalPreviewBox = styled.div`
  border-radius: 10px;
  padding: 10px 15px;
  background: #eff3fd;
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
`;

export const RentalPreviewBoxHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  width: 100%;
  border-radius: 5px;
  padding: 5px 0px;
`;

export const AddNewBusinessContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  background-color: white;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 45px;
  border-radius: 10px;
  align-items: center;
  padding: 50px 30px;
`;

export const AddBusinessCloseIcon = styled.div`
  position: absolute;
  right: 25px;
  top: 20px;
`;

export const AddBusinessBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  grid-gap: 10px;
`;

export const BusinessProfileContainer = styled.div`
  position: absolute;
  top: 60px;
  right: 305px;
  background: transparent !important;
`;

export const BusinessProfileWrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 90px;
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
`;

export const NotificationContainer = styled.div`
  position: absolute;
  top: 65px;
  right: 225px;
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
  background: #ffffff;
  width: 15%;
  padding: 20px;
  border-radius: 10px;
`;

export const FieldAlertContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  background-color: white;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 20px;
  border-radius: 20px;
  align-items: center;
  padding: 30px;
`;
