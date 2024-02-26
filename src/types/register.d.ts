export type SelectParams = {
  id: number;
  name: string;
};

export type RegisterParams = {
  links: {
    contract: string;
    limits: string;
    privacy_policy: string;
  };
  pep: SelectParams[];
  pep_status: SelectParams[];
  pep_definition: string;
  pep_family_definition: string;
};
