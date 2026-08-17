interface NotificationData {
  name: string;
  email: string;
  message?: string;
  excitement: number;
}

interface MandalRegistrationData {
  fullName: string;
  mandalName: string;
  city: string;
  mobileNumber: string;
  email: string;
  subscriptionPlan: string;
}

interface MandalContactData {
  fullName: string;
  mandalName: string;
  mobileNumber: string;
  email: string;
  message: string;
}

interface Web3FormsResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

const WEB3FORMS_ACCESS_KEY =
  "b6856f53-855e-40bf-8fdd-27d894955aa9";

const WEB3FORMS_ACCESS_KEY_MANDAL_REGISTRATION =
  "dfa33e11-2e24-47e6-9a05-bacb084bb868";

/**
 * Common Web3Forms request handler.
 * Keeps all API/error handling in one place.
 */
const submitWeb3Form = async (
  accessKey: string,
  fields: Record<string, string>,
  errorMessage: string
): Promise<Web3FormsResponse> => {
  const formData = new FormData();

  formData.append("access_key", accessKey);

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    let data: Web3FormsResponse;

    try {
      data = await response.json();
    } catch {
      throw new Error(errorMessage);
    }

    if (!response.ok || !data.success) {
      throw new Error(data.message || errorMessage);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error(errorMessage);
  }
};

/**
 * Send notification data
 */
export const sendNotificationData = async (
  notificationData: NotificationData
): Promise<Web3FormsResponse> => {
  const {
    name,
    email,
    message = "",
    excitement,
  } = notificationData;

  return submitWeb3Form(
    WEB3FORMS_ACCESS_KEY,
    {
      name,
      email,
      message,
      excitement: String(excitement),
      subject: `New Utsavam Notification Request - ${name}`,
      from_name: "Utsavam Website",
    },
    "Unable to save your notification request."
  );
};

/**
 * Send Mandal registration data
 */
export const sendMandalRegistrationData = async (
  mandalRegistrationData: MandalRegistrationData
): Promise<Web3FormsResponse> => {
  const {
    fullName,
    mandalName,
    city,
    mobileNumber,
    email,
    subscriptionPlan,
  } = mandalRegistrationData;

  return submitWeb3Form(
    WEB3FORMS_ACCESS_KEY_MANDAL_REGISTRATION,
    {
      fullName,
      mandalName,
      city,
      mobileNumber,
      email,
      subscriptionPlan,
      subject: `New Mandal Registration - ${mandalName}`,
      from_name: "Utsavam Website",
    },
    "Unable to save mandal registration."
  );
};

/**
 * Send Mandal contact enquiry
 */
export const sendContactData = async (
  mandalContactData: MandalContactData
): Promise<Web3FormsResponse> => {
  const {
    fullName,
    mandalName,
    mobileNumber,
    email,
    message,
  } = mandalContactData;

  return submitWeb3Form(
    WEB3FORMS_ACCESS_KEY_MANDAL_REGISTRATION,
    {
      fullName,
      mandalName,
      mobileNumber,
      email,
      message,
      subject: `New Mandal Contact Enquiry - ${mandalName}`,
      from_name: "Utsavam Website",
    },
    "Unable to send mandal contact enquiry."
  );
};