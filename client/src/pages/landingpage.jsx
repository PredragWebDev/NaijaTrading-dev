import { Navigation } from "../components/landingpage/navigation";
import { Stock } from "../components/landingpage/stock";
import { Practice } from "../components/landingpage/practice";
import { Trade } from "../components/landingpage/trade";
import { Yourself } from "../components/landingpage/yourself";
import { Faqs } from "../components/landingpage/faqs";
import {Footer} from "../components/landingpage/footer";

export const LandingPage = () => {
    return (
        <div>
            <Navigation/>
            <Stock/>
            <Practice/>
            <Trade/>
            <Yourself/>
            <Faqs />
            <Footer/>
        </div>
    )
}