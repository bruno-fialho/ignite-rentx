interface IVariables {
  name: string;
  link: string;
}

interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: IVariables,
    path: string
  ): Promise<void>;
}

export { IMailProvider, IVariables };
