import Link from "next/link"

const Navbar = () => {
    return (
        <div className="navbar">
            <h1 className="nomar">Schildscans</h1>
            <nav>
                <Link href={"/"}>Home</Link>
                <Link href={"/scans/"}>Scans</Link>
                <Link href={"/contact"}>Contact</Link>
                <Link href={"/report-issue"}>Report an issue</Link>
            </nav>
        </div>
    );
}
 
export default Navbar;