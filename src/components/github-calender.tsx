'use client';
import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import type { Activity } from 'react-github-calendar';

const GitHubCalendar = dynamic(
    () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
    {
        ssr: false,
        loading: () => <div className="h-[159px] w-full" />,
    }
);

function GithubCalender() {
    const processContributions = useCallback((contributions: Activity[]) => {
        return contributions.slice(91, 365);
    }, []);

    return (
        <div className="flex justify-center my-8">
            <GitHubCalendar
                username="ssk090"
                transformData={processContributions}
            />
        </div>
    );
}

export default GithubCalender;