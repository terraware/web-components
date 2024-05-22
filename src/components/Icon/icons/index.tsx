import React from 'react';

import BlobbyGrayIconImage from '../../svg/BlobbyGrayIconImage';
import BlobbyGrayIconImport from '../../svg/BlobbyGrayIconImport';
import BlobbyGrayIconUploadToTheCloud from '../../svg/BlobbyGrayIconUploadToTheCloud';
import BlobbyIconCloudChecked from '../../svg/BlobbyIconCloudChecked';
import BlobbyIconExportOrUploadPhoto from '../../svg/BlobbyIconExportOrUploadPhoto';
import BlobbyIconFolder from '../../svg/BlobbyIconFolder';
import BlobbyIconGraphReport from '../../svg/BlobbyIconGraphReport';
import BlobbyIconHappy from '../../svg/BlobbyIconHappy';
import BlobbyIconLeaf from '../../svg/BlobbyIconLeaf';
import BlobbyIconLibrary from '../../svg/BlobbyIconLibrary';
import BlobbyIconNursery from '../../svg/BlobbyIconNursery';
import BlobbyIconParchment from '../../svg/BlobbyIconParchment';
import BlobbyIconSeedBank from '../../svg/BlobbyIconSeedBank';
import BlobbyIconSeedling from '../../svg/BlobbyIconSeedling';
import BlobbyIconSeeds from '../../svg/BlobbyIconSeeds';
import BlobbyIconSite from '../../svg/BlobbyIconSite';
import BlobbyIconSparkles from '../../svg/BlobbyIconSparkles';
import BlobbyIconWrench from '../../svg/BlobbyIconWrench';
import Bug from '../../svg/Bug';
import Calendar from '../../svg/Calendar';
import Cancel from '../../svg/IconCancel';
import CaretDown from '../../svg/CaretDown';
import CaretLeft from '../../svg/CaretLeft';
import CaretRight from '../../svg/CaretRight';
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
import Filter from '../../svg/Filter';
import Folder from '../../svg/Folder';
import Futures from '../../svg/IconFutures';
import Help from '../../svg/Help';
import Home from '../../svg/Home';
import IconAdd from '../../svg/IconAdd';
import IconArrowRight from '../../svg/IconArrowRight';
import IconBusinessNetwork from '../../svg/IconBusinessNetwork';
import IconCoinInHand from '../../svg/IconCoinInHand';
import IconColumns from '../../svg/IconColumns';
import IconEdit from '../../svg/IconEdit';
import IconExport from '../../svg/IconExport';
import IconFile from '../../svg/IconFile';
import IconFolder from '../../svg/IconFolder';
import IconFullScreen from '../../svg/IconFullScreen';
import IconGraphReport from '../../svg/IconGraphReport';
import IconHistory from '../../svg/IconHistory';
import IconImport from '../../svg/IconImport';
import IconLayers from '../../svg/IconLayers';
import IconLibrary from '../../svg/IconLibrary';
import IconList from '../../svg/IconList';
import IconLocations from '../../svg/IconLocations';
import IconMenu from '../../svg/IconMenu';
import IconMenuHorizontal from '../../svg/IconMenuHorizontal';
import IconModule from '../../svg/IconModule';
import IconMyLocation from '../../svg/IconMyLocation';
import IconNursery from '../../svg/IconNursery';
import IconParchment from '../../svg/IconParchment';
import IconRedo from '../../svg/IconRedo';
import IconRestorationSite from '../../svg/IconRestorationSite';
import IconSeedling from '../../svg/IconSeedling';
import IconSlice from '../../svg/IconSlice';
import IconSubmit from '../../svg/IconSubmit';
import IconSubtract from '../../svg/IconSubtract';
import IconSynced from '../../svg/IconSynced';
import IconTrashCan from '../../svg/IconTrashCan';
import IconTreasureMap from '../../svg/IconTreasureMap';
import IconUndo from '../../svg/IconUndo';
import IconVariable from '../../svg/IconVariable';
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
import Sparkles from '../../svg/Sparkles';
import Species from '../../svg/Species';
import Species2 from '../../svg/Species2';
import Spinner from '../../svg/Spinner';
import Success from '../../svg/Success';
import Touchscreen from '../../svg/Touchscreen';
import UploadCloud from '../../svg/UploadCloud';
import Warning from '../../svg/Warning';
import Wifi from '../../svg/IconWifi';
import IconMarker from '../../svg/IconMarker';

export type IconName =
  | 'blobbyGrayIconImage'
  | 'blobbyGrayIconImport'
  | 'blobbyGrayIconUploadToTheCloud'
  | 'blobbyIconCloudChecked'
  | 'blobbyIconExportOrUploadPhoto'
  | 'blobbyIconFolder'
  | 'blobbyIconGraphReport'
  | 'blobbyIconHappy'
  | 'blobbyIconLeaf'
  | 'blobbyIconLibrary'
  | 'blobbyIconNursery'
  | 'blobbyIconParchment'
  | 'blobbyIconSeedBank'
  | 'blobbyIconSeedling'
  | 'blobbyIconSeeds'
  | 'blobbyIconSite'
  | 'blobbyIconSparkles'
  | 'blobbyIconWrench'
  | 'bug'
  | 'calendar'
  | 'cancel'
  | 'caretDown'
  | 'caretLeft'
  | 'caretRight'
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
  | 'filter'
  | 'folder'
  | 'futures'
  | 'help'
  | 'home'
  | 'iconAdd'
  | 'iconArrowRight'
  | 'iconBusinessNetwork'
  | 'iconCoinInHand'
  | 'iconColumns'
  | 'iconEdit'
  | 'iconExport'
  | 'iconFile'
  | 'iconFolder'
  | 'iconFullScreen'
  | 'iconGraphReport'
  | 'iconHistory'
  | 'iconImport'
  | 'iconLayers'
  | 'iconLibrary'
  | 'iconList'
  | 'iconLocations'
  | 'iconMarker'
  | 'iconMenu'
  | 'iconMenuHorizontal'
  | 'iconModule'
  | 'iconMyLocation'
  | 'iconNursery'
  | 'iconParchment'
  | 'iconRedo'
  | 'iconRestorationSite'
  | 'iconSeedling'
  | 'iconSlice'
  | 'iconSubmit'
  | 'iconSubtract'
  | 'iconSynced'
  | 'iconTrashCan'
  | 'iconTreasureMap'
  | 'iconUndo'
  | 'iconVariable'
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
  blobbyGrayIconImage: BlobbyGrayIconImage,
  blobbyGrayIconImport: BlobbyGrayIconImport,
  blobbyGrayIconUploadToTheCloud: BlobbyGrayIconUploadToTheCloud,
  blobbyIconCloudChecked: BlobbyIconCloudChecked,
  blobbyIconExportOrUploadPhoto: BlobbyIconExportOrUploadPhoto,
  blobbyIconFolder: BlobbyIconFolder,
  blobbyIconGraphReport: BlobbyIconGraphReport,
  blobbyIconHappy: BlobbyIconHappy,
  blobbyIconLeaf: BlobbyIconLeaf,
  blobbyIconLibrary: BlobbyIconLibrary,
  blobbyIconNursery: BlobbyIconNursery,
  blobbyIconParchment: BlobbyIconParchment,
  blobbyIconSeedBank: BlobbyIconSeedBank,
  blobbyIconSeedling: BlobbyIconSeedling,
  blobbyIconSeeds: BlobbyIconSeeds,
  blobbyIconSite: BlobbyIconSite,
  blobbyIconSparkles: BlobbyIconSparkles,
  blobbyIconWrench: BlobbyIconWrench,
  bug: Bug,
  calendar: Calendar,
  cancel: Cancel,
  caretDown: CaretDown,
  caretLeft: CaretLeft,
  caretRight: CaretRight,
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
  filter: Filter,
  folder: Folder,
  futures: Futures,
  help: Help,
  home: Home,
  iconAdd: IconAdd,
  iconArrowRight: IconArrowRight,
  iconBusinessNetwork: IconBusinessNetwork,
  iconCoinInHand: IconCoinInHand,
  iconColumns: IconColumns,
  iconEdit: IconEdit,
  iconExport: IconExport,
  iconFile: IconFile,
  iconFolder: IconFolder,
  iconFullScreen: IconFullScreen,
  iconGraphReport: IconGraphReport,
  iconHistory: IconHistory,
  iconImport: IconImport,
  iconLayers: IconLayers,
  iconLibrary: IconLibrary,
  iconList: IconList,
  iconLocations: IconLocations,
  iconMarker: IconMarker,
  iconMenu: IconMenu,
  iconMenuHorizontal: IconMenuHorizontal,
  iconModule: IconModule,
  iconMyLocation: IconMyLocation,
  iconNursery: IconNursery,
  iconParchment: IconParchment,
  iconRedo: IconRedo,
  iconRestorationSite: IconRestorationSite,
  iconSeedling: IconSeedling,
  iconSlice: IconSlice,
  iconSubmit: IconSubmit,
  iconSubtract: IconSubtract,
  iconSynced: IconSynced,
  iconTrashCan: IconTrashCan,
  iconTreasureMap: IconTreasureMap,
  iconUndo: IconUndo,
  iconVariable: IconVariable,
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
