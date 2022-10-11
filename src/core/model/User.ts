export interface User {
  id: string;
  name: string;
  phone: string;
  birth?: string;
  email?: string;
  zip?: string;
  addr1?: string;
  addr2?: string;
  bankAccount?: string;
  bankAccountName?: string;
  bankCode?: number;
  bankbookFilePath?: string;
  ci?: string;
  di?: string;
  idCardFilePath?: string;
  localCode?: number;
  modifiedDate?: Date;
  password?: string;
  password2?: string;
  recommendId?: string;
  registeredDate: Date;
  role: number;
  sexCode: number;
  yolifeId?: string;
}