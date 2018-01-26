import React from 'react'
import {Link} from "react-router-dom";
import {Button} from 'semantic-ui-react'

export const Navigation = () => (
    <div className={"center"}>
        <Link to={'/munich'}><Button>Munich</Button></Link>
        <Link to={'/passau'}> <Button>Passau</Button></Link>
        <Link to={'/regensburg'}><Button>Regensburg</Button></Link>
    </div>
);