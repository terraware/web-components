import { Story } from '@storybook/react';
import React from 'react';
import Navbar, { Props as NavbarProps } from '../components/Navbar/Navbar';
import NavItem from '../components/Navbar/NavItem';
import NavSection from '../components/Navbar/NavSection';
import SubNavbar from '../components/Navbar/SubNavbar';

export default {
  title: 'Navbar',
  component: Navbar,
  argTypes: {},
};

const Template: Story<NavbarProps> = (args) => {
  const [selectedItem, setSelectedItem] = React.useState('accessions');

  const onClickHandler = () => {
    setSelectedItem('home');
  };

  // tslint:disable-next-line:no-empty
  const showNavbar = (show: any) => {};

  return (
    <Navbar setShowNavBar={showNavbar}>
      <NavItem label='Home' icon='home' selected={selectedItem === 'home'} onClick={() => setSelectedItem('home')} />
      <NavItem label='Species' icon='species' selected={selectedItem === 'species'} onClick={() => setSelectedItem('species')} />
      <NavSection />
      <NavItem label='Seeds' icon='seeds' onClick={() => setSelectedItem('seeds-dashboard')}>
        <SubNavbar>
          <NavItem label='Dashboard' selected={selectedItem === 'seeds-dashboard'} onClick={() => setSelectedItem('seeds-dashboard')} />
          <NavItem label='Accessions' selected={selectedItem === 'accessions'} onClick={() => setSelectedItem('accessions')} />
          <NavItem label='Monitoring' selected={selectedItem === 'monitoring'} onClick={() => setSelectedItem('monitoring')} />
        </SubNavbar>
      </NavItem>
      <NavItem label='Seedlings' icon='iconSeedling' onClick={() => setSelectedItem('inventory')}>
        <SubNavbar>
          <NavItem label='Inventory' selected={selectedItem === 'inventory'} onClick={() => setSelectedItem('inventory')} />
        </SubNavbar>
      </NavItem>
      <NavSection title='Settings' />
      <NavItem label='Organization' icon='organizationNav' selected={selectedItem === 'organization'} onClick={() => setSelectedItem('organization')} />
      <NavItem label='People' icon='peopleNav' selected={selectedItem === 'people'} onClick={() => setSelectedItem('people')} />
      <NavItem label='Locations' icon='iconLocations' onClick={() => setSelectedItem('seedbanks')}>
        <SubNavbar>
          <NavItem label='Seed Banks' selected={selectedItem === 'seedbanks'} onClick={() => setSelectedItem('seedbanks')} />
          <NavItem label='Nurseries' selected={selectedItem === 'nurseries'} onClick={() => setSelectedItem('nurseries')} />
        </SubNavbar>
      </NavItem>
    </Navbar>
  );
};

export const Default = Template.bind({});
