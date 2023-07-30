/*
interface IPayment {
  sum: number;
  from: number;
  to: number;
}

enum PaymentStatus {
  failed = 'failed',
  success = 'success',
}

interface IPaymentSuccess extends IPayment {
  databaseId: number;
}

interface IPaymentFailed {
  errorMessage: string;
  errorCode: number;
}

interface IPaymentRequest extends IPayment {}

interface IPaymentResponseSuccess {
  status: PaymentStatus.success;
  data: IPaymentSuccess;
}

interface IPaymentResponseFailed {
  status: PaymentStatus.failed;
  data: IPaymentFailed;
}

type PaymentResponseType =
  | IPaymentResponseSuccess
  | IPaymentResponseFailed;

function isPaymentFailed(
  res: PaymentResponseType,
): res is IPaymentResponseFailed {
  if (res.status === PaymentStatus.failed) {
    return true;
  }
  return false;
}

function isPaymentSuccess(
  res: PaymentResponseType,
): res is IPaymentResponseSuccess {
  if (res.status === PaymentStatus.success) {
    return true;
  }
  return false;
}

function getIdFromData(
  res: PaymentResponseType,
): number | never {
  if (isPaymentSuccess(res)) {
    return res.data.databaseId;
  } else {
    throw new Error(res.data.errorMessage);
  }
}
*/