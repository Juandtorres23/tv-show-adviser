import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import s from "./style.module.css"
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logoImg from "./assets/images/tmdblogo.png"
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";

TVShowAPI.fetchPopulars();
export function App() {
    const [currentTVShow, setCurrentTVShow] = useState();
    const [recommendationList, setRecommentationList] = useState([])
   
    async function fetchPopulars() {
        const popularTVShowsList = await TVShowAPI.fetchPopulars();
        if (popularTVShowsList.length > 0) {
            setCurrentTVShow(popularTVShowsList[0]);
        } 
    }

    async function fetchRecommendations(tvShowId) {
        const recommendationListResp = await TVShowAPI.fetchRecommendations(tvShowId);
        if (recommendationListResp.length > 0) {
            setRecommentationList(recommendationListResp.slice(0, 10));
        } 
    }

    useEffect(() => {
        fetchPopulars();
    }, []);

    useEffect(() => {
        if (currentTVShow) {
            fetchRecommendations(currentTVShow.id);
        }
    }, [currentTVShow]);

    console.log(currentTVShow);
    
    console.log(recommendationList)
    return (
        <div className={s.main_container}
        style={{background: currentTVShow ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover` : "black"}}>
            <div className={s.header}>
                <div className="row">
                    <div className="col-4">
                        <Logo img={logoImg} title="Watowatch" subtitle="Find a show you may like" />
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <input style={{width: "100%"}} type="text" />
                    </div>
                </div>
            </div>
            <div className={s.tv_show_detail}> 
                {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
            </div>
            <div className={s.recommended_tv_show}>
                {currentTVShow && (
                <>
                <TVShowListItem tvShow={currentTVShow} onClick={(tvShow)=> {
                    console.log("I have been clicked", tvShow)
                }}/>
                <TVShowListItem tvShow={currentTVShow} onClick={(tvShow)=> {
                    console.log("I have been clicked", tvShow)
                }}/>
                </>
                )}
            </div>
        </div>
    );
}