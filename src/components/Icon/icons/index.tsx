import React from 'react';

import BlobbyGrayIconUploadToTheCloud from './assets/BlobbyGrayIconUploadToTheCloud';
import BlobbyIconHappy from './assets/BlobbyIconHappy';
import BlobbyIconLeaf from './assets/BlobbyIconLeaf';
import BlobbyIconLibrary from './assets/BlobbyIconLibrary';
import BlobbyIconSeedBank from './assets/BlobbyIconSeedBank';
import BlobbyIconWrench from './assets/BlobbyIconWrench';

import Monitoring from './assets/BlobbyIconHeartMonitor';
import Organization from './assets/BlobbyIconOrganization';
import People from './assets/BlobbyIconPeople';
import SeedBank from './assets/BlobbyIconSeedBank';

import Bug from './assets/Bug';
import Calendar from './assets/Calendar';
import CaretDown from './assets/CaretDown';
import CaretLeft from './assets/CaretLeft';
import CaretUp from './assets/CaretUp';
import ChevronDown from './assets/ChevronDown';
import ChevronUp from './assets/ChevronUp';
import Close from './assets/Close';
import Critical from './assets/Critical';
import Edit from './assets/Edit';
import Error from './assets/Error';
import Export from './assets/Export';
import Filter from './assets/Filter';
import Folder from './assets/Folder';
import Help from './assets/Help';
import Home from './assets/Home';
import Cancel from './assets/IconCancel';
import ChargingBattery from './assets/IconChargingBattery';
import Checkmark from './assets/IconCheckmark';
import Dashboard from './assets/IconDashboard';
import MonitoringNav from './assets/IconHeartMonitor';
import Mail from './assets/IconMail';
import PeopleNav from './assets/IconManager';
import IconMenu from './assets/IconMenu';
import OrganizationNav from './assets/IconOrg';
import SeedBankNav from './assets/IconSeedBank';
import Wifi from './assets/IconWifi';
import Info from './assets/Info';
import Key from './assets/Key';
import Leaf from './assets/Leaf';
import Lock from './assets/Lock';
import MenuVertical from './assets/MenuVertical';
import Notification from './assets/Notification';
import Person from './assets/Person';
import Plus from './assets/Plus';
import RestorationSite from './assets/RestorationSite';
import Search from './assets/Search';
import Seeds from './assets/Seeds';
import Site from './assets/Site';
import Sparkles from './assets/Sparkles';
import Species from './assets/Species';
import Species2 from './assets/Species2';
import Spinner from './assets/Spinner';
import Success from './assets/Success';
import Touchscreen from './assets/Touchscreen';
import UploadCloud from './assets/UploadCloud';
import Warning from './assets/Warning';

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
  | 'iconMenu'
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
  iconMenu: IconMenu,
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
