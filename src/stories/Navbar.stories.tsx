import { Story } from '@storybook/react';
import React from 'react';
import Navbar, { Props as NavbarProps } from '../components/Navbar/Navbar';
import NavItem from '../components/Navbar/NavItem';
import NavSection from '../components/Navbar/NavSection';

export default {
  title: 'Navbar',
  component: Navbar,
  argTypes: {},
};

const Template: Story<NavbarProps> = (args) => {
  const [selectedItem, setSelectedItem] = React.useState('projects');

  const onClickHandler = () => {
    setSelectedItem('home');
  };

  // tslint:disable-next-line:no-empty
  const showNavbar = (show: any) => {
  };

  return (
    <Navbar setShowNavBar={showNavbar}>
      <NavItem label='Home' icon='home' selected={selectedItem === 'home'} onClick={() => setSelectedItem('home')} />
      <NavSection title='Flora' />
      <NavItem label='Seeds' icon='seeds' onClick={onClickHandler}/>
      <NavItem label='Summary' selected={selectedItem === 'summary'} onClick={() => setSelectedItem('summary')} />
      <NavItem label='Accessions' selected={selectedItem === 'accessions'} onClick={() => setSelectedItem('accessions')} />
      <NavItem label='Plants' icon='restorationSite' selected={selectedItem === 'plants'} onClick={() => setSelectedItem('plants')} />
      <NavItem label='Species' icon='species' selected={selectedItem === 'species'} onClick={() => setSelectedItem('species')} />
      <NavSection title='Hardware' />
      <NavItem label='Seed Bank' icon='restorationSite' selected={selectedItem === 'seedbank'} onClick={() => setSelectedItem('seedbank')} />
      <NavItem label='Drone Data' icon='species' selected={selectedItem === 'dronedata'} onClick={() => setSelectedItem('dronedata')} />
      <NavSection />
      <NavItem label='Projects' icon='folder' selected={selectedItem === 'projects'} onClick={() => setSelectedItem('projects')} />
      <NavItem label='Sites' icon='leaf' selected={selectedItem === 'sites'} onClick={() => setSelectedItem('sites')} />
      <NavSection />
      <NavItem label='Admin' icon='key' selected={selectedItem === 'admin'} onClick={() => setSelectedItem('admin')} />
    </Navbar>
  );
};

export const Default = Template.bind({});
