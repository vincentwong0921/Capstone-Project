import './ContactUs.css'

function ContactUs() {
    return(
        <>
            <div className='ContactUsContainer'>
                <div className='StoreInfo'>
                    <div className='Hub'>
                        <h1 className='SN'>The Phone Hub</h1>
                        <p>- Where Value is delivered</p>
                    </div>
                    <h3>Location</h3>
                    <p>2024 Jay St, Santa Clara, CA 95050</p>
                    <h3>Operating Hours</h3>
                    <p>Mon - Fri 8:30 AM - 4:30 PM</p>
                    <h3>Contact Us</h3>
                    <p>Live Chat<i onClick={() => window.alert('Feature Coming Soon!') } className="fa-brands fa-whatsapp"></i></p>
                    <p>Phone# (415) 903-2854</p>
                </div>
            </div>
        </>
    )
}

export default ContactUs
