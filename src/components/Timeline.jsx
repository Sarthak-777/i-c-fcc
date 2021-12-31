import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import usePhotos from '../hooks/use-photos'
import {Instagram} from 'react-content-loader'
import Post from './post'

function Timeline() {
    //we need to get the logged in user's photos
    const {photos} = usePhotos()
    //on loading the photos, we need to use react skeleton
    console.log('photos',photos)
    return (
        <div className = "container col-span-2">
            {!photos? (
                <>
                    {[... new Array(4)].map((_, index)=> (
                    // <Skeleton key = {index} count = {1} width = {320} height = {400} />
                    <Instagram />
                    ))}
                </>
            ) : photos?.length > 0 ?(
                photos.map((content)=><Post key = {content.docId} content = {content} />)
            ) : (
                <p className = "text-center text-2xl">
                    Follow people to see photos
                </p>
            )}
        </div>
    )
}

export default Timeline
