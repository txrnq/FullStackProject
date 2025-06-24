import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../css/Topnavbar.css';
 
import logo1 from '../../assets/images/logo1.png';



function Topnavbar() {
    return (
        <Navbar className="container topnavbar-body">
            <Container>
                <Navbar.Brand href="#home" className="text-white fw-bold fs-5">
                    Hello. Have a good day : 
                </Navbar.Brand>
                <Navbar.Toggle />
            </Container>
        </Navbar>

    );
}

export default Topnavbar;