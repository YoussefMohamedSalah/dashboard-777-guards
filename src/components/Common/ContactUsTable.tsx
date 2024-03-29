import { useState } from "react";
import DataTable from "react-data-table-component";
import DownloadCSV from "components/UI/DownloadCSV";
import TableSearch from "./TableSearch";
import { ContactUs } from "types/ContactUs";
import { formatCsvTitle } from "utils/FormatCsvTitle";
import { formatContactUsCsvOutput } from "utils/FormatNormalCsvOutput";

interface Props<T extends ContactUs> {
    title: string;
    columns: any;
    data: T[];
    defaultSortFieldId?: number;
    pagination?: boolean;
    selectableRows?: boolean;
    className?: string;
    highlightOnHover?: boolean;
    renderSearch: boolean;
    renderDownload: boolean;
    filterOptions?: string[];
    selectItem?: (item: T) => void;
}

function ContactUsTable<T extends ContactUs>({
    title,
    columns,
    data,
    defaultSortFieldId,
    pagination,
    selectableRows,
    className,
    highlightOnHover,
    renderSearch,
    renderDownload,
    filterOptions,
    selectItem,
}: Props<T>) {
    const [filteredData, setFilteredData] = useState<T[]>([...data] || []);
    const onSearchFilter = (filtered: T[]) => setFilteredData(filtered);

    let csvData = formatContactUsCsvOutput(filteredData || data) || [];

    return (
        <div className="row clearfix g-3">
            {/* Cards Filters */}
            <div className="d-flex flex-column flex-lg-row justify-content-between">
                {/* Download as a CSV */}
                {renderDownload && <DownloadCSV fileName={formatCsvTitle("Contact-us")} csvData={csvData} />}
                {/* Search Input */}
                {renderSearch && (
                    <TableSearch
                        data={data}
                        terms={filterOptions || []}
                        classNameContainer={true}
                        onSearchFilter={onSearchFilter}
                    />
                )}
            </div>
            {/* TABLE */}
            <div className="col-sm-12">
                <DataTable
                    title={title}
                    columns={columns}
                    data={filteredData || data}
                    defaultSortFieldId={defaultSortFieldId || 1}
                    pagination={pagination || true}
                    selectableRows={selectableRows || false}
                    className={
                        className || "table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
                    }
                    highlightOnHover={highlightOnHover || true}
                />
            </div>
        </div>
    );
}

export default ContactUsTable;
