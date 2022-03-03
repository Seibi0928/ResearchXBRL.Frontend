import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { CommonMenuRepository } from "../CommonMenuReporitory";
import { CorporationsSelector } from "../CorporationsSelector";

describe('PerformanceIndicators', () => {
    test('企業検索ボックスに値を入れたとき、企業名のサジェスト処理が走る', async () => {
        const component = render(<CorporationsSelector repository={createMockCommonMenuRepository()()} setter={() => { }} />);
        fireEvent.input(component.getByRole('combobox'), { target: { value: 'さけ' } });

        expect(await component.findByText('鮭産業')).toBeInTheDocument();
    });
});

function createMockCommonMenuRepository() {
    return jest.fn<CommonMenuRepository, []>()
        .mockImplementation(() => {
            return {
                getAccountItems: async (_: string) => {
                    return new Promise(r => r([{ label: '売掛金', value: '売掛金' }]));
                },
                getCorporations: (_: string) => {
                    return new Promise(r => r([{ label: '鮭産業', value: 'Exxxx' }]));
                }
            };
        });
}
