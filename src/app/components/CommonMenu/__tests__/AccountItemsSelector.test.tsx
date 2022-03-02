import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { AccountItemsSelector } from "../AccountItemsSelector";
import { CommonMenuRepository } from "../CommonMenuReporitory";

describe('PerformanceIndicators', () => {
    test('勘定項目検索ボックスに値を入れたとき、企業名のサジェスト処理が走る', async () => {
        const component = render(<AccountItemsSelector repository={createMockCommonMenuRepository()()} setter={() => { }} />);
        fireEvent.input(component.getByRole('combobox'), { target: { value: '売' } });

        expect(await component.findByText('売掛金')).toBeInTheDocument();
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
