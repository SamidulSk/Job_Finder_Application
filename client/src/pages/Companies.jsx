import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CompanyCard,
  CustomButton,
  Header,
  ListBox,
  Loading,
} from "../components";
import { apiRequest, updateUrl } from "../config/index.js";

const Companies = () => {
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordsCount, setRecordsCount] = useState(0);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cmpLocation, setCmpLocation] = useState("");
  const [sort, setSort] = useState("Newest");
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    setIsFetching(true);
    const newURL = updateUrl({
      pageNum: page,
      query: searchQuery,
      cmpLoc: cmpLocation,
      sort: sort,
      navigate: navigate,
      location: location,
    });

    try {
      const res = await apiRequest({
        url: newURL,
        method: "GET",
      });

      setNumPage(res?.numOfPage);
      setData(res?.data);
      setRecordsCount(res?.total);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [sort, page]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    await fetchCompanies();
  };

  const handleShowMore = (e) => {
    e.preventDefault();
    setPage((prev) => prev + 1);
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
      <Header
        title="🌟 Find Your Dream Company"
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={cmpLocation}
        setLocation={setCmpLocation}
      />

      <div className="container mx-auto flex flex-col gap-5 2xl:gap-10 px-5 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm md:text-base text-gray-800">
            Showing: <span className="font-bold text-blue-600">{recordsCount}</span>{" "}
            Companies Available
          </p>

          <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
            <p className="text-sm text-gray-700">Sort By:</p>
            <ListBox sort={sort} setSort={setSort} />
          </div>
        </div>

        <div className="w-full flex flex-col gap-6">
          {data?.map((cmp, index) => (
            <CompanyCard cmp={cmp} key={index} />
          ))}

          {isFetching && (
            <div className="mt-10">
              <Loading />
            </div>
          )}

          <p className="text-sm text-gray-500 text-right">
            {data?.length} records out of {recordsCount}
          </p>
        </div>

        {numPage > page && !isFetching && (
          <div className="w-full flex items-center justify-center pt-12">
            <CustomButton
              onClick={handleShowMore}
              title="🔄 Load More"
              containerStyles="text-white bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
