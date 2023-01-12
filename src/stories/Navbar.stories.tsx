import { Story } from '@storybook/react';
import React from 'react';
import Navbar, { Props as NavbarProps } from '../components/Navbar/Navbar';
import NavItem from '../components/Navbar/NavItem';
import NavSection from '../components/Navbar/NavSection';
import SubNavbar from '../components/Navbar/SubNavbar';

export default {
  title: 'Navbar',
  component: Navbar,
  argTypes: {
    backgroundTransparent: false,
  },
};

const Template: Story<NavbarProps> = (args) => {
  const [selectedItem, setSelectedItem] = React.useState('accessions');

  // tslint:disable-next-line:no-empty
  const showNavbar = (show: any) => {};

  return (
    <Navbar setShowNavBar={showNavbar} backgroundTransparent={args.backgroundTransparent}>
      <NavItem label='Home' icon='home' selected={selectedItem === 'home'} onClick={() => setSelectedItem('home')} />
      <NavItem label='Species' icon='species' selected={selectedItem === 'species'} onClick={() => setSelectedItem('species')} />
      <NavSection />
      <NavItem label='Seeds' icon='seeds'>
        <SubNavbar>
          <NavItem label='Dashboard' selected={selectedItem === 'seeds-dashboard'} onClick={() => setSelectedItem('seeds-dashboard')} />
          <NavItem label='Accessions' selected={selectedItem === 'accessions'} onClick={() => setSelectedItem('accessions')} />
          <NavItem label='Monitoring' selected={selectedItem === 'monitoring'} onClick={() => setSelectedItem('monitoring')} />
        </SubNavbar>
      </NavItem>
      <NavItem label='Seedlings' icon='iconSeedling'>
        <SubNavbar>
          <NavItem label='Inventory' selected={selectedItem === 'inventory'} onClick={() => setSelectedItem('inventory')} />
          <NavItem label='Withdrawal Log' selected={selectedItem === 'withdrawallog'} onClick={() => setSelectedItem('withdrawallog')} />
        </SubNavbar>
      </NavItem>
      <NavItem label='Locations' icon='seedbankNav'>
        <SubNavbar>
          <NavItem label='Seed Bank' selected={selectedItem === 'seedbank'} onClick={() => setSelectedItem('seedbank')} />
          <NavItem label='Nurseries' selected={selectedItem === 'nurseries'} onClick={() => setSelectedItem('nurseries')} />
          <NavItem label='Planting Sites' selected={selectedItem === 'plantingsites'} onClick={() => setSelectedItem('plantingsites')} />
        </SubNavbar>
      </NavItem>
      <NavSection title='Settings' />
      <NavItem label='Organization' icon='organizationNav' selected={selectedItem === 'organization'} onClick={() => setSelectedItem('organization')} />
      <NavItem label='People' icon='peopleNav' selected={selectedItem === 'people'} onClick={() => setSelectedItem('people')} />
      <NavItem label='Locations' icon='iconLocations'>
        <SubNavbar>
          <NavItem label='Seed Banks' selected={selectedItem === 'seedbanks'} onClick={() => setSelectedItem('seedbanks')} />
          <NavItem label='Nurseries' selected={selectedItem === 'nurseries'} onClick={() => setSelectedItem('nurseries')} />
        </SubNavbar>
      </NavItem>
    </Navbar>
  );
};

export const Default = Template.bind({});
