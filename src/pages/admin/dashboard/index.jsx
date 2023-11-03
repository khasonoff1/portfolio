import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookOutlined, ExperimentOutlined, StarOutlined, CodeOutlined, UserOutlined } from "@ant-design/icons";

import { useGetEducationsQuery } from "../../../redux/queries/education";
import { useGetExperiencesQuery } from "../../../redux/queries/experience";
import { useGetUsersQuery } from "../../../redux/queries/user";
import { getPortfolios, portfolioName } from "../../../redux/slices/portfolio";
import { getSkills, skillName } from "../../../redux/slices/skills";

import "./style.css";

const DashboardPage = () => {
    const dispatch = useDispatch();
    const { data: { total: education } = { educations: [], total: 0 } } = useGetEducationsQuery();
    const { data: { total: experience } = { educations: [], total: 0 } } = useGetExperiencesQuery();
    const { data: { total: user } = { educations: [], total: 0 } } = useGetUsersQuery();
    const { portfolios } = useSelector((state) => state[portfolioName]);
    const { skills } = useSelector((state) => state[skillName]);

    useEffect(() => {
        dispatch(getSkills({}));
        dispatch(getPortfolios({}));
    }, [dispatch]);
    return (
        <Fragment>
            <h1>Dashboard:</h1>
            <br />
            <div className="cards">
                <div className="card">
                    <div className="card-box">
                        <BookOutlined />
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">Education</h3>
                        <p className="card-desc">Total: {education}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-box">
                        <ExperimentOutlined />
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">Experiences</h3>
                        <p className="card-desc">Total: {experience}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-box">
                        <CodeOutlined />
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">Portfolio</h3>
                        <p className="card-desc">Total: {portfolios.length}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-box">
                        <StarOutlined />
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">Skills</h3>
                        <p className="card-desc">Total: {skills.length}</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-box">
                        <UserOutlined />
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">Users</h3>
                        <p className="card-desc">Total: {user}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DashboardPage;
