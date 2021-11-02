import {BottomSheetOption} from './../commons/bottom-sheet/types';
import {Images} from './../utils/images';
export const dummyBottomSheetOptions: BottomSheetOption[] = [
  {
    icon: Images.TRANSFER_CASH,
    title: 'Transfer Cash',
    subtitle: 'Add and withdraw cash',
  },
  {
    icon: Images.SAVE,
    title: 'Save for something new',
    subtitle: 'Save and invest towards something in the future',
  },
  {
    icon: Images.INVITE,
    title: 'Invite XYZ',
    subtitle: 'Give XYZ access to login to their account',
  },
  {
    icon: Images.share,
    title: 'Share Profile Link',
    subtitle: 'Others can signup and contribute to this account',
  },
  {
    icon: Images.share,
    title: 'Settings and Account Documents',
    subtitle:
      'View and change settings. Access monthly statements, trade confirms and tax docs',
  },
];
