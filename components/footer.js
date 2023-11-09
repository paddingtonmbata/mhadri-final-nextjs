import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    const iconColor = "white";
    return (
        <footer className="w-full flex justify-center">
            <div className="bg-black text-white flex flex-row justify-between py-10 w-10/12 self-center rounded-tl-lg rounded-tr-lg">
                <div className="flex flex-col items-start ml-24">
                    <a href="http://mhadri.org">
                    <span>&copy; {new Date().getFullYear()} MHADRI </span>
                    </a>                    
                </div>

                {/* <!-- Social Icons --> */}
                <div className="flex flex-row items-right mr-24">
                    <a href="https://www.facebook.com/MigHealthDev/" className="mx-4">
                        <FontAwesomeIcon icon={faFacebook} style={{color: iconColor}}/>
                    </a>
                    <a href="https://twitter.com/mhadri_" className="mx-4">
                        <FontAwesomeIcon icon={faTwitter} style={{color: iconColor}} />
                    </a>
                </div>
            </div>         
        </footer>
    );
}