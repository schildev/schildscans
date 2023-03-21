import Image from "next/image";
const Footer = () => {
    return (
        <footer>
            <h3>Support Me</h3>
            <div className="cryptos">
                <div className="crypto">
                    <Image width={50} height={50} quality={100} alt={"Ethereum logo"} src={"/ether.png"} />
                    <span>0x4943eEDc99A7DB06e146717CDaE739c92501a32E</span>
                </div>
                <div className="crypto">
                    <Image width={50} height={50} alt={"usdc logo"} src={"/usdc.png"} quality={100} />
                    <span>0x4943eEDc99A7DB06e146717CDaE739c92501a32E</span>
                </div>
                <div className="crypto">
                    <Image width={50} height={50} alt={"theter usd logo"} src={"/tusd.png"} quality={100} />
                    <span>0x4943eEDc99A7DB06e146717CDaE739c92501a32E</span>
                </div>            
            </div>
        </footer>
    );
}
 
export default Footer;