import React from 'react';

const Repository = () => {
    const documents = [
        {
            category: 'Reports',
            links: [
                { 
                    title: 'Newsletter',
                    path: '/profile',
                    pdfUrl: '/document_pdfs/Nutrition Fellowship Brief.pdf'
                },
                { 
                    title: 'Nutrition Profiles',
                    path: '/profile',
                    pdfUrl: '/document_pdfs/Stunting profile.pdf'
                },
            ],
        },
        {
            category: 'Policies and Plans',
            links: [
                {
                    title: 'Nutrition Policy 2025',
                    path: '/policy2025',
                    pdfUrl: '/pdfs/nutrition-policy-2025.pdf'
                },
            ],
        },
        {
            category: 'Blogs',
            links: [
                {
                    title: 'Nutrition Fellowship for Nepal : 2nd Meet',
                    path: '/nfn2ndmeetblog',
                    pdfUrl: '/pdfs/nfn-2nd-meet.pdf'
                },
                {
                    title: 'Internship at Nutrition Rehabilitation Center',
                    path: '/nrcinternblog',
                    pdfUrl: '/pdfs/nrc-intern.pdf'
                },
            ],
        },
        {
            category: 'Researches',
            links: [
                {
                    title: 'AI in Nutrition',
                    path: '/aiinnutrition',
                    pdfUrl: '/pdfs/ai-nutrition.pdf'
                },
            ],
        },
    ];

    const handleDownloadClick = (link) => {
        if (link.pdfUrl) {
            const linkElement = document.createElement('a');
            linkElement.href = link.pdfUrl;
            linkElement.download = link.pdfUrl.split('/').pop(); // Extract file name from URL for download
            document.body.appendChild(linkElement);
            linkElement.click();
            document.body.removeChild(linkElement);
        }
    };

    const handleTitleClick = (link) => {
        if (link.pdfUrl) {
            window.open(link.pdfUrl, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50" id='documents'>
            <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-xl lg:text-[22px] font-bold mb-4">RESOURCES & PUBLICATIONS</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {documents.map((docCategory, index) => (
                        <div key={index} 
                             className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="bg-[#bad8bb] px-6 py-1">
                                <h3 className="text-xl text-[#265728]">
                                    {docCategory.category}
                                </h3>
                            </div>
                            <ul className="divide-y divide-gray-100">
                                {docCategory.links.map((link, idx) => (
                                    <li key={idx}>
                                        <div className="flex items-center justify-between w-full">
                                            <button 
                                                onClick={() => handleTitleClick(link)} // Opens the PDF in a new tab
                                                className="w-3/4 px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                <p className="text-gray-800 font-medium hover:text-[#265728] transition-colors duration-200">
                                                    {link.title}
                                                </p>
                                            </button>
                                            <button 
                                                onClick={() => handleDownloadClick(link)} // Downloads the PDF
                                                className="w-1/4 px-6 py-4 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                <span className="text-[#265728] hover:text-green-700">
                                                    <svg 
                                                        className="w-5 h-5" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path 
                                                            strokeLinecap="round" 
                                                            strokeLinejoin="round" 
                                                            strokeWidth={2} 
                                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                                                        />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Repository;


