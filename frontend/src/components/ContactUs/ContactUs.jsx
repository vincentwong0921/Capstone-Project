import './ContactUs.css'
import { DiGithubFull } from "react-icons/di";
import { FaLinkedin } from "react-icons/fa";
import { FaCopyright } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

function ContactUs() {
    const toLinkedin = () => {
        window.open('https://www.linkedin.com/in/vincent-wong-106942154/');
    }

    const toGitHub = () => {
        window.open('https://github.com/vincentwong0921/The-Phone-Hub');
    }

    const toEmail = () => {
        window.location.href = 'mailto:vincentwong0921@gmail.com';
    }

    return(
        <>
            <div className='ContactUsContainer'>
                <div className='StoreInfo'>
                    <div className='Hub'>
                        <h1 className='SN'>The Phone Hub</h1>
                    </div>
                    <div>
                        <h3>Location</h3>
                        <p>2024 Jay St, Santa Clara, CA 95050</p>
                        <h3>Operating Hours</h3>
                        <p>Mon - Fri 8:30 AM - 4:30 PM</p>
                        <h3>Contact Us</h3>
                        <p className='LiveChat'>Live Chat<i onClick={() => window.alert('Feature Coming Soon!') } className="fa-brands fa-whatsapp"></i></p>
                        <p className='PhoneNum'>Phone# (415) 903-2854</p>
                    </div>
                    <div className='ContactMe'>
                        <p className='MyName'>Vincent Wong</p>
                        <FaCopyright />
                        <DiGithubFull className='GitHub' onClick={toGitHub}/>
                        <FaLinkedin className='Linkedin' onClick={toLinkedin}/>
                        <MdOutlineEmail className='Email' onClick={toEmail}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs
