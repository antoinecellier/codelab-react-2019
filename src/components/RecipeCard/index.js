import React from "react";
import { Link } from "react-router-dom";

function RecipeCard({ item }) {
    return (
        <div className="column is-half-tablet is-one-quarter-desktop">
            <Link className="Card__content card is-flex" to={`/recipes/${item.id}`}>
                <div className="card-content">
                    <div className="content">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default RecipeCard;
