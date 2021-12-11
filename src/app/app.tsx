import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { renderRoutes, RouteConfig } from "react-router-config";
import { TimeSeriesAnalysis } from './components/TimeSeriesAnalysis/Analysis';
import '../stylesheet/app.scss';
import { TimeSeriesAnalysisRepositoryImpl } from './infrastructure/TimeSeriesAnalysis/TimeSeriesAnalysisRepository';

const Root: React.FunctionComponent<any> = ({ route }: { route: RouteConfig }) => (
    <div>
        <nav>
            <ul>
                <li>
                    <Link to="/" className="link-button">時系列分析</Link>
                </li>
            </ul>
        </nav>
        <div id="mainFrame">
            {renderRoutes(route.routes)}
        </div>
    </div>
);

const routes: RouteConfig[] = [
    {
        component: Root,
        routes: [
            {
                path: "/",
                exact: true,
                component: () => TimeSeriesAnalysis({
                    repository: new TimeSeriesAnalysisRepositoryImpl()
                })
            }
        ]
    }
];

ReactDOM.render(
    <Router>
        {renderRoutes(routes)}
    </Router>,
    document.getElementById('root')
);
