import { AGORA_LOGO, SNAPSHOT_LOGO, TALLY_LOGO } from './logos';

export const getProperLogoSource = (application: string) => {
  switch (application) {
    case 'agora': {
      return AGORA_LOGO;
    }
    case 'snapshot': {
      return SNAPSHOT_LOGO;
    }
    case 'tally': {
      return TALLY_LOGO;
    }

    default: {
      return null;
    }
  }
};
