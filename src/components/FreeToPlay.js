import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../store/actions/gameActions';
import { NavLink } from 'react-router-dom';

function FreeToPlay(props) {

    useEffect(() => {
        props.fetchGames()
    }, [])

    if (!props.games || !props.games[0]) {
        return (
            <div>
                <h1 className="heading">Loading!</h1>
            </div>
        )
    } else {

        // sort by F2P rating
        let f2p = props.games
            .sort((gameA, gameB) => gameB.averageF2P - gameA.averageF2P)
            .map(games => {
                let altText = `${games.title} logo`;
                let gameLink = `/game/${games.id}`;
                return (
                    <li key={games.id} className='homepage-item'>
                        <NavLink to={gameLink}>
                        <div className="rating-item_game">
                            <img src={games.logo} alt={altText} className="rating-item_game_logo" />
                        </div>
                        </NavLink>
                        <div className='homepage-item_stat'>
                            <h3 className="homepage_game-title">{games.title}</h3>
                            {games.averageF2P && <p className="tertiary-text">Free To Play: {games.averageF2P.toFixed(1)}</p>}
                        </div>
                    </li>
                )
            })

        return (
            <ul className='homepage-category-list'>
                {f2p}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        games: state.gameR.games
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGames: () => dispatch(gameActions.fetchGames())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreeToPlay);