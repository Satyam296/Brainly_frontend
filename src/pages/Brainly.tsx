import Navbar from "../components/Navbar" ;
import Hero from "../components/Hero" ;
import {Analytics} from "../components/Analytics" ;
import {Newsletter} from "../components/Newsletter" ;
import {Prices} from "../components/Prices" ; 
import {Footer} from "../components/Footer" ; 

export function Brainly (){
    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-customBlack-200">
            <Navbar/>
            <Hero /> 
            <Analytics />
            <Newsletter />
            <Prices/>
            <Footer /> 
        </div>
    );
}