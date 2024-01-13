import { Link } from "react-router-dom";
import { arrow } from '../../assets/icons'
import { render } from "react-dom";

const InfoBox = ({ text, link, btnTxt}) => (
    <div className="info-box">
        <p className="font-medium sm:text-xl text-center">{text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn">
            {btnTxt}
            <img src={arrow} className="w-4 h-4 object-contain"/>
        </Link>
    </div>
)

const renderContent = {
    1: (
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
        Hi, I'm
        <span className='font-semibold mx-2 text-white'>Adrian</span>
        👋
        <br />
        A Software Engineer from Croatia 🇭🇷
      </h1>
    ),
    2 : (
        <InfoBox 
            text="worked with many companies"
            link="/about"
            btnTxt='Learn More'
        />
    ),
    3 : (
        <InfoBox 
            text="worked with many companies"
            link="/Projects"
            btnTxt='Portfolio'
        />
    ),
    4 : (
        <InfoBox 
            text="worked with many companies"
            link="/contact"
            btnTxt="Let's talk"
        />
    )
}

const Homeinfo = ({currentStage}) => {
    return renderContent[currentStage] || null
}

export default Homeinfo;