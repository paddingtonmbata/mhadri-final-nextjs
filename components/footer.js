"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
export default function Footer() {
    const iconColor = "black";
    return (
        <footer className="w-full mt-6 leading-7 lg:leading-10">
            <div className="about px-8 lg:px-60 py-8 bg-gray-100 flex flex-col lg:flex-row lg:justify-between">
                <div className="content">
                    <Image src="/footer_logo.png" height={50} width={257}/>
                    <p className="text-base-m lg:text-base">
                        MHADRI aims to advance evidence-informed global<br/> migration health policies and practices that will<br/> improve the health and wellbeing of people and<br/> communities affected by migration.
                    </p>
                </div>
                <div className="links">
                    <h3 className="text-pg-title-m lg:text-pg-title font-bold mb-2">About MHADRI</h3>
                    <ul className="text-base-m lg:text-base font-bold">
                        <li><a href="https://mhadri.org/about/" target="_blank" rel="noopener noreferrer">About</a></li>
                        <li><a href="https://mhadri.org/about/steering-committee/" target="_blank" rel="noopener noreferrer">Steering Committee</a></li>
                        <li><a href="https://mhadri.org/about/early-career-researchers/" target="_blank" rel="noopener noreferrer">Early Career Researchers</a></li>
                        <li><a href="https://mhadri.org/2021/01/27/get-involved-reviewing-publications-for-the-iom-migration-health-evidence-portal-for-covid-19/" target="_blank" rel="noopener noreferrer">Get involved!</a></li>
                        <li><a href="https://mhadri.org/contact/" target="_blank" rel="noopener noreferrer">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="bg-white text-black flex flex-row justify-between w-full  rounded-tl-lg rounded-tr-lg px-8 lg:px-60 py-8">
                <div className="flex flex-col items-start">
                    <a href="http://mhadri.org">
                    <span>&copy; {new Date().getFullYear()} MHADRI </span>
                    </a>                    
                </div>

                {/* <!-- Social Icons --> */}
                <div className="flex flex-row items-right" id="contact">
                    <a href="https://www.facebook.com/MigHealthDev/" className="mx-4">
                        <FontAwesomeIcon icon={faFacebook} style={{color: iconColor}}/>
                    </a>
                    <a href="https://twitter.com/mhadri_" className="mx-4">
                        <FontAwesomeIcon icon={faXTwitter} style={{color: iconColor}} />
                    </a>
                </div>
            </div>         
        </footer>
    );
}