import Image from "next/image"
import Link from "next/link"

const Scanlist = ({scans}) => {
    return (
        <div className="scansList">
            {scans.map(scan => (
                <div className="scan" key={scan.name}>
                    <Link href={`/scans/${scan?.slug}`}>
                        <Image
                        alt={`Cover of ${scan.name}`}
                        src={"https://schildscans.pythonanywhere.com" + scan.image}
                        width={130}
                        height={165}
                        />
                        <p className="dosis nomar">{scan.name}</p>
                    </Link>
                    
                </div>
            ))}
        </div>
    );
}
 
export default Scanlist;
