import React from 'react'
import { Layout, Menu} from 'antd';
import LoginForm from '../../components/LoginForm';
import 'antd/dist/antd.css'

const { Header, Content, Footer } = Layout;

const Home = () => {
    console.log('home !');
    return (
        <Layout className="layout">
        <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
            })}
        </Menu>
        </Header>
        <Content style={{ padding: '50px 250px' }}>
            <LoginForm/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
    );
}

export default Home;
