import React from 'react';

import BlobbyGrayIconUploadToTheCloud from '../../svg/BlobbyGrayIconUploadToTheCloud';
import BlobbyIconHappy from '../../svg/BlobbyIconHappy';
import BlobbyIconLeaf from '../../svg/BlobbyIconLeaf';
import BlobbyIconLibrary from '../../svg/BlobbyIconLibrary';
import BlobbyIconSeedBank from '../../svg/BlobbyIconSeedBank';
import BlobbyIconWrench from '../../svg/BlobbyIconWrench';
import Bug from '../../svg/Bug';
import Calendar from '../../svg/Calendar';
import Cancel from '../../svg/IconCancel';
import CaretDown from '../../svg/CaretDown';
import CaretLeft from '../../svg/CaretLeft';
import CaretUp from '../../svg/CaretUp';
import ChargingBattery from '../../svg/IconChargingBattery';
import Checkmark from '../../svg/IconCheckmark';
import ChevronDown from '../../svg/ChevronDown';
import ChevronUp from '../../svg/ChevronUp';
import Close from '../../svg/Close';
import Critical from '../../svg/Critical';
import Dashboard from '../../svg/IconDashboard';
import Edit from '../../svg/Edit';
import Error from '../../svg/Error';
import Export from '../../svg/Export';
import Filter from '../../svg/Filter';
import Folder from '../../svg/Folder';
import Help from '../../svg/Help';
import Home from '../../svg/Home';
import IconColumns from '../../svg/IconColumns';
import IconEdit from '../../svg/IconEdit';
import IconFile from '../../svg/IconFile';
import IconMenu from '../../svg/IconMenu';
import IconMenuHorizontal from '../../svg/IconMenuHorizontal';
import IconMyLocation from '../../svg/IconMyLocation';
import IconSeedling from '../../svg/IconSeedling';
import IconSynced from '../../svg/IconSynced';
import IconTrashCan from '../../svg/IconTrashCan';
import Info from '../../svg/Info';
import Key from '../../svg/Key';
import Leaf from '../../svg/Leaf';
import Lock from '../../svg/Lock';
import MenuVertical from '../../svg/MenuVertical';
import Monitoring from '../../svg/BlobbyIconHeartMonitor';
import MonitoringNav from '../../svg/IconHeartMonitor';
import Mail from '../../svg/IconMail';
import Notification from '../../svg/Notification';
import Organization from '../../svg/BlobbyIconOrganization';
import OrganizationNav from '../../svg/IconOrg';
import People from '../../svg/BlobbyIconPeople';
import PeopleNav from '../../svg/IconManager';
import Person from '../../svg/Person';
import Plus from '../../svg/Plus';
import RestorationSite from '../../svg/RestorationSite';
import Search from '../../svg/Search';
import SeedBank from '../../svg/BlobbyIconSeedBank';
import SeedBankNav from '../../svg/IconSeedBank';
import Seeds from '../../svg/Seeds';
import Site from '../../svg/Site';
import Sparkles from '../../svg/Sparkles';
import Species from '../../svg/Species';
import Species2 from '../../svg/Species2';
import Spinner from '../../svg/Spinner';
import Success from '../../svg/Success';
import Touchscreen from '../../svg/Touchscreen';
import UploadCloud from '../../svg/UploadCloud';
import Warning from '../../svg/Warning';
import Wifi from '../../svg/IconWifi';

export type IconName =
  | 'blobbyGrayIconUploadToTheCloud'
  | 'blobbyIconSeedBank'
  | 'blobbyIconHappy'
  | 'blobbyIconLeaf'
  | 'blobbyIconLibrary'
  | 'blobbyIconWrench'
  | 'bug'
  | 'calendar'
  | 'cancel'
  | 'caretDown'
  | 'caretLeft'
  | 'caretUp'
  | 'chargingBattery'
  | 'checkmark'
  | 'chevronDown'
  | 'chevronUp'
  | 'close'
  | 'critical'
  | 'dashboard'
  | 'edit'
  | 'error'
  | 'export'
  | 'filter'
  | 'folder'
  | 'help'
  | 'home'
  | 'iconColumns'
  | 'iconEdit'
  | 'iconFile'
  | 'iconMenu'
  | 'iconMenuHorizontal'
  | 'iconMyLocation'
  | 'iconSeedling'
  | 'iconSynced'
  | 'iconTrashCan'
  | 'info'
  | 'key'
  | 'leaf'
  | 'lock'
  | 'mail'
  | 'menuVertical'
  | 'monitoring'
  | 'monitoringNav'
  | 'notification'
  | 'organization'
  | 'organizationNav'
  | 'people'
  | 'peopleNav'
  | 'person'
  | 'plus'
  | 'restorationSite'
  | 'search'
  | 'seedbank'
  | 'seedbankNav'
  | 'seeds'
  | 'sparkles'
  | 'species'
  | 'species2'
  | 'spinner'
  | 'success'
  | 'touchscreen'
  | 'uploadCloud'
  | 'warning'
  | 'wifi';

type SVGComponent = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
>;
const icons: Record<IconName, SVGComponent> = {
  blobbyGrayIconUploadToTheCloud: BlobbyGrayIconUploadToTheCloud,
  blobbyIconSeedBank: BlobbyIconSeedBank,
  blobbyIconHappy: BlobbyIconHappy,
  blobbyIconLeaf: BlobbyIconLeaf,
  blobbyIconLibrary: BlobbyIconLibrary,
  blobbyIconWrench: BlobbyIconWrench,
  bug: Bug,
  calendar: Calendar,
  cancel: Cancel,
  caretDown: CaretDown,
  caretLeft: CaretLeft,
  caretUp: CaretUp,
  chargingBattery: ChargingBattery,
  checkmark: Checkmark,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  close: Close,
  critical: Critical,
  dashboard: Dashboard,
  edit: Edit,
  error: Error,
  export: Export,
  filter: Filter,
  folder: Folder,
  help: Help,
  home: Home,
  iconColumns: IconColumns,
  iconEdit: IconEdit,
  iconFile: IconFile,
  iconMenu: IconMenu,
  iconMenuHorizontal: IconMenuHorizontal,
  iconMyLocation: IconMyLocation,
  iconSeedling: IconSeedling,
  iconSynced: IconSynced,
  iconTrashCan: IconTrashCan,
  info: Info,
  key: Key,
  leaf: Leaf,
  lock: Lock,
  mail: Mail,
  menuVertical: MenuVertical,
  monitoring: Monitoring,
  monitoringNav: MonitoringNav,
  notification: Notification,
  organization: Organization,
  organizationNav: OrganizationNav,
  people: People,
  peopleNav: PeopleNav,
  person: Person,
  plus: Plus,
  restorationSite: RestorationSite,
  search: Search,
  seedbank: SeedBank,
  seedbankNav: SeedBankNav,
  seeds: Seeds,
  sparkles: Sparkles,
  species: Species,
  species2: Species2,
  spinner: Spinner,
  success: Success,
  touchscreen: Touchscreen,
  uploadCloud: UploadCloud,
  warning: Warning,
  wifi: Wifi,
};

export default icons;
