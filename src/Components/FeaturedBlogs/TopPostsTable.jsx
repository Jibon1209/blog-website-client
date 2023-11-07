import DataTable from "react-data-table-component";
import PropTypes from "prop-types";

const TopPostsTable = ({ data }) => {
  const columns = [
    {
      name: "Serial",
      selector: (row, index) => index + 1,
      center: "true",
      maxWidth: "20px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: "true",
    },
    {
      name: "Owner",
      selector: (row) => row.authorInfo.map((N) => N.name),
      sortable: "true",
      maxWidth: "250px",
    },
    {
      name: "Profile Picture",
      center: "true",
      maxWidth: "50px",
      cell: (row) => (
        <img
          className="w-[36px] h-[36px]"
          src={row.authorInfo.map((N) => N.photo)}
          alt={row.blogOwner}
        />
      ),
    },
  ];

  return <DataTable columns={columns} data={data} className=" px-4 mt-2 " />;
};
TopPostsTable.propTypes = {
  data: PropTypes.array.isRequired,
};
export default TopPostsTable;
