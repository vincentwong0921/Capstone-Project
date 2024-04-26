import './AboutUs.css'


function AboutUs() {
    return(
        <>
            <div className='aboutUs'>
                <div className='whoweare'>
                    <h2 className='wwah2'>Who We Are</h2>
                    <p className='wwap'>Headquartered in the Silicon Valley and as one of the industry leaders, The Phone Hub, founded in 2007, operates a revolutionized online platform specialized in overstock and pre-owned merchandise distribution. We offers business and individual members easy accesses to high quality products at a very low cost. Also, the transactions are unbelievably easy and hassle-free. We serve a large community with thousands of active members from all over the United Stated as well as internationally.</p>
                </div>
                <div className='OurProducts'>
                    <h2 className='OPh2'>Our Products</h2>
                    <p className='OPp'>We offer a wide range of products. Add the items you are interested to purchase into your shopping cart when placing an order. Each item is also independently conditioned by its cosmetic rating (multiple cosmetic grades) and functionality.</p>
                </div>
                <div className='PaymentInfo'>
                    <h2 className='PIh2'>Payment</h2>
                    <p className='PIp'>We accept all major credit cards, Paypal, and bank transfer(Zelle, Wire, ACH)</p>
                </div>
                <div className='ShippingInfo'>
                    <h2 className='SIh2'>Shipping</h2>
                    <p className='SIp'>We offer 4 different tiers of shipping method and they will be listed at the checkout page.</p>
                </div>
            </div>
        </>
    )
}


export default AboutUs
