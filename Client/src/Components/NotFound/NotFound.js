import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div id="not-found">
            <main>
                <h2>404</h2>
                <img src="https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOTwhHnd7WfxugPcHW6QZpCVBIKg1rS-kJmcrpxhxEoLOWeYsmO6Bna-1EgDaF2c9MleUZJf8QWTsAGyDhmOMAcLy-SHHQ=w1920-h927" alt="broken-machine" />
                <div>
                    <h3>The page you are looking for was removed or does not exist!</h3>
                    <Link to="/"><button type="button">Go to home page</button></Link>
                </div>
            </main>
        </div>
    );
};