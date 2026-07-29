import { Spinner } from "@heroui/react";

import React from 'react';

const loading = () => {
    return (
        <div className="flex items-center gap-4 h-screen justify-center">
            <Spinner color="warning" />
        </div>
    );
};

export default loading;