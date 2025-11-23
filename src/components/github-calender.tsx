'use client';
import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import type { Activity } from 'react-github-calendar';

const GitHubCalendar = dynamic(
    () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
    {
        ssr: false,
        loading: () => <div className="w-full" />,
    }
);

function GithubCalender() {
    return (
        <div className="flex justify-center my-8">
            <GitHubCalendar
                username="ssk090"

            />
        </div>
    );
}

export default GithubCalender;