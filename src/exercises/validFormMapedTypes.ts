(function () {
  interface IForm {
    name: string;
    password: string;
  }

  const form: IForm = {
    name: 'Name',
    password: 'pass',
  };

  // My
  type GetForm<T> = {
    [K in keyof T]: {
      isValid: boolean;
      errorMessage?: string;
    };
  };

  // Antot L.
  type Validation<T> = {
    [K in keyof T]:
      | {
          isValid: true;
        }
      | {
          isValid: false;
          errorMessage: string;
        };
  };

  const formValidation: Validation<IForm> = {
    name: { isValid: true },
    password: {
      isValid: false,
      errorMessage: 'Pass is required',
    },
  };
})();
