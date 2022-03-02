import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { renderRoutes, RouteConfig } from "react-router-config";
import { TimeSeriesAnalysis } from './components/Analysis/TimeSeriesAnalysis/TimeSeriesAnalysis';
import { PerformanceIndicators } from './components/Analysis/PerformanceIndicators/PerformanceIndicators';
import { CommonMenuRepositoryImpl } from './infrastructure/CommonMenu/CommonMenuRepository';
import { TimeSeriesAnalysisRepositoryImpl } from './infrastructure/Analysis/TimeSeriesAnalysis/TimeSeriesAnalysisRepository';
import { PerformanceIndicatorRepositoryImpl } from './infrastructure/Analysis/PerformanceIndicators/PerformanceIndicatorsRepository';
import '../stylesheet/app.scss';

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
                    commonMenuRepository: new CommonMenuRepositoryImpl(),
                    timeSeriesAnalysisRepository: new TimeSeriesAnalysisRepositoryImpl()
                })
            },
            {
                path: "/PerformanceIndicators",
                exact: true,
                component: () => PerformanceIndicators({
                    commonMenuRepository: new CommonMenuRepositoryImpl(),
                    performanceIndicatorRepository: new PerformanceIndicatorRepositoryImpl()
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

